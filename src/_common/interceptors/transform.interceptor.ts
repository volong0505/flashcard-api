import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponse } from '../../dtos';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, BaseResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<BaseResponse<T>> {
    // const response = context.switchToHttp().getResponse();
    
    return next.handle().pipe(
      map((data) => ({
        status: data.status,
        message: data?.message,
        data: data?.result || data, // Tùy biến tùy theo cách bạn trả về từ service
        timestamp: new Date().toISOString(),
      })),
    );
  }
}