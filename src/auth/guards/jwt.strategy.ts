import { Request } from "express"
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                let data = request?.cookies["auth-cookie"]
               
                if(!data) return false

                return data
            }]),
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: 'secret',
        })
    }

    async validate(payload: any) {
        return { ...payload.user };
    }
}