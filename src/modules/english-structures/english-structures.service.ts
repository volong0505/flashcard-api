import { Injectable } from '@nestjs/common';
import { EnglishStructuresRepository } from './english-structures.repository';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class EnglishStructuresService {

    constructor(
        private readonly repository: EnglishStructuresRepository,
        private readonly authService: AuthService
        
    ) {}

    async findAll(query: any, req): Promise<any> {
        const userId = await this.getUserId(req);

        const raw = await this.repository.getAll(userId);

        return {
            list: raw.map(e => ({
                _id: e._id.toString(),
                structure: e.structure,
                description: e.description
            }))
        }
    }

    
        async create(dto: any, req) {
            const userId = await this.getUserId(req)
            const newStructure = await this.repository.create(dto, userId);
            return newStructure
        }

      async getUserId(req) {
        const cookie = req.cookies['access_token'];
        const { user } = await this.authService.verifyToken(cookie);
        return user._id
    }
}
