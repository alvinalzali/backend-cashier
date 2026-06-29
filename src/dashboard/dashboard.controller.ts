import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardQueryDto } from './dto/dashboard.dto';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @UseGuards(AuthGuard)
    @Get('summary')
    async getDashboardSummary(@Query() query: DashboardQueryDto) {
        return this.dashboardService.getSummary(query);
    }

}
