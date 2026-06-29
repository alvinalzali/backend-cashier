import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardQueryDto, DashboardRange } from './dto/dashboard.dto';


@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) {}

    async getSummary(query: DashboardQueryDto) {
        // Time Range
        let startDate: Date;
        let endDate: Date = new Date();

        if (query.range === DashboardRange.TODAY) {
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0); // Set ke jam 00:00:00 hari ini
        } else if (query.range === DashboardRange.WEEK) {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        } else if (query.range === DashboardRange.MONTH) {
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1); 
        } else if(query.range === DashboardRange.YEAR){
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        }else if (query.range === DashboardRange.CUSTOM && query.startDate && query.endDate) {
        startDate = new Date(query.startDate);
        endDate = new Date(query.endDate);
        endDate.setHours(23, 59, 59, 999);
        } else {
        // Default Today
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        }

        // transaction stats
        const transactionStats = await this.prisma.transactions.aggregate({
            _count: { id: true },
            _sum: { totalPrice: true },
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                }
            }
        })

        const totalTransactions = transactionStats._count.id;
        const totalSales = transactionStats._sum.totalPrice || 0;

        // ambil produk dengan stok tipis (<= 20)
        const lowStockProducts = await this.prisma.products.findMany({
            where: {
                qty: {
                    lte: 20
                }
            },
            select: {
                id : true,
                sku: true,
                name: true,
                qty: true
            },
        });

        // cari top product top 5
        // search by id dan total qty terjual
        const topSellingDetails = await this.prisma.transactionDetails.groupBy({
            by: ['productId'],
            _sum: { qty: true },
            where: {
                transaction: {
                    createdAt: {
                        gte: startDate,
                        lte: endDate,
                    }
                },
            },
            orderBy: {
                _sum: {
                    qty: 'desc'
                }
            },
            take: 5
        });

        // ambil nama dari productId
        const topProducts = await Promise.all(
            topSellingDetails.map(async (item) => {
                const product = await this.prisma.products.findUnique({
                    where: { id: item.productId },
                    select: { name: true }
                });

                return {
                    name: product?.name || `Produk ${item.productId}`,
                    soldQty: item._sum.qty || 0,
                }
            })
        );

        return {
            totalSales,
            totalTransactions,
            topProducts,
            lowStockProducts,
        };
    }
}
