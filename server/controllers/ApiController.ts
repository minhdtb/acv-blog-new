import {Controller} from "../core/decorators/controllers/Controller";
import {Get} from "../core/decorators/methods/Get";
import {User} from "../models/User";
import {Post} from "../core/decorators/methods/Post";
import {Data} from "../core/decorators/parameters/Data";

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

    @Post('check')
    private checkUser(@Data('username') username: string,
                      @Data('password') password: string) {
        return new Promise((resolve, reject) => {
            User.findOne({username: username})
                .then(user => {
                    if (user) {
                        user.comparePassword(password)
                            .then(value => {
                                value ? resolve(user) : resolve(null);
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