import { SetMetadata } from '@nestjs/common';
export const TransformKey = 'isNoTransform';
export const NoTransform = () => SetMetadata(TransformKey, true);