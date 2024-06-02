import {BadRequestException, CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {AuthService} from "../auth.service";
import {EAuth} from "../../types";

@Injectable()
export class LocalAuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const {email, password} = request['body'];

        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new BadRequestException(EAuth.INVALID_CREDENTIALS);
        }

        request['user'] = request['body'];

        return true;
    }


}
