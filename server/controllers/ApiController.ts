import {Controller} from "../core/decorators/controllers/Controller";
import {Get} from "../core/decorators/methods/Get";
import {User} from "../models/User";
import {Post} from "../core/decorators/methods/Post";
import {Data} from "../core/decorators/parameters/Data";
import * as jwt from "jsonwebtoken";

export const JWT_SECRET = '220183';

@Controller('api')
class ApiController {

    @Get('posts')
    private Test() {
        return [{
            title: 'aaaaaaaa'
        }];
    }

    @Post('register')
    private Register(@Data('username') username: string,
                     @Data('password') password: string) {
        return User.create({
            username: username,
            password: password
        })
    }

    @Post('login')
    private login(@Data('username') username: string,
                  @Data('password') password: string) {
        return new Promise((resolve, reject) => {
            User.findOne({username: username})
                .then(user => {
                    if (user) {
                        user.comparePassword(password)
                            .then(value => {
                                if (value) {
                                    let loggedUser = {
                                        id: user.id,
                                        username: user.username,
                                        token: null
                                    };
                                    loggedUser.token = jwt.sign(loggedUser, JWT_SECRET, {expiresIn: 1440});
                                    resolve(loggedUser);
                                } else {
                                    resolve(null)
                                }
                            })
                            .catch(reject);
                    } else {
                        resolve(null);
                    }
                })
                .catch(reject);
        });
    }
}