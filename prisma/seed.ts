import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '../src/generated/prisma/client'; 
import readline from 'readline/promises';
import * as bcrypt from 'bcrypt';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {

    //buat warning di log dengan jawaban ya atau tidak
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const answer = await rl.question('Are you sure you want to seed the database? Warning: This will delete all data in the database. (y/n) ');
    
    // close terminal langsung kalau jawabannya tidak
    rl.close(); 

    if (answer.toLowerCase().trim() !== 'y') {
        console.log('Seeding cancelled.');
        return;
    }

    console.log('Start seeding ...');

    await prisma.$executeRawUnsafe(`
        TRUNCATE TABLE "Cart", "TransactionDetails", "Transactions", "Users", "Products" 
        RESTART IDENTITY 
        CASCADE;
    `);

    // hasing password
    const hashedPassword = await bcrypt.hash('Admin123', 10);

    // user admin
    const admin = await prisma.users.create({
        data: {
            id: 1,
            username: 'admin',
            passwordHash: hashedPassword,
            name: 'Admin',
        },
    });

    console.log(`Created user with id: ${admin.id}`);

    // add products
    const productData = [
        {
            sku: 'PROD-FOOD-001',
            name: 'Kopi Susu Gula Aren',
            price: 18000,
            qty: 50,
            category: 'Minuman',
            pictureUrl: 'http://localhost:3005/uploads/kopisusugulaaren.jpg',
        },
        {
            sku: 'PROD-FOOD-002',
            name: 'Warteg Bahari Spesial',
            price: 25000,
            qty: 2,
            category: 'Makanan',
            pictureUrl: '', 
        },
        {
            sku: 'PROD-NOTE-003',
            name: 'Buku Catatan Spiral A5',
            price: 12000,
            qty: 0, 
            category: 'Alat Tulis',
            pictureUrl: '',
        },
        {
            sku: 'PROD-UMUM-004',
            name: 'Fantech Mouse Wireless',
            price: 85000,
            qty: 15,
            category: 'Umum',
            pictureUrl: '',
        },
    ];

    for (const prod of productData) {
        await prisma.products.create({ data: prod });
    }

    console.log(`Created ${productData.length} products`);

    // ambil data untuk buat item keranjang
    const kopi = await prisma.products.findFirst({
        where: {
            sku: 'PROD-FOOD-001',
        }
    });

    // buat item keranjang
    if (kopi) {
        await prisma.cart.create({
            data: {
                userId: admin.id,
                productId: kopi.id,
                qty: 5
            },
        });
        console.log(`Created cart item for product with id: ${kopi.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(`Error seeding: ${e}`);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });