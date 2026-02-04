import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponse } from '../../dtos';
import { Reflector } from '@nestjs/core';
import { TransformKey } from '../../_decorators/no-transform.decorator';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, BaseResponse<T>> {
  constructor(private reflector: Reflector) {}
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<BaseResponse<T>> {
    // const response = context.switchToHttp().getResponse();
    const noTransform = this.reflector.getAllAndOverride<boolean>(TransformKey, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (noTransform) {
      return next.handle(); // Trả về dữ liệu gốc (Buffer)
    }

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