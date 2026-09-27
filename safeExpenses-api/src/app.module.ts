import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ExpensesModule } from './modules/expenses/expenses.module';

@Module({
  imports: [ExpensesModule],
  controllers: [HealthController],
})
export class AppModule {}
