import {Controller} from "../core/decorators/controllers/Controller";
import {Get} from "../core/decorators/methods/Get";
import {User} from "../models/User";
import {Post} from "../core/decorators/methods/Post";
import {Data} from "../core/decorators/parameters/Data";

@Controller('api')
class ApiController {

    @Get('posts')
    public Test() {
        return [];
    }

    @Post('register')
    private Register(@Data('username') username: string,
                     @Data('password') password: string) {
        return User.create({
            username: username,
            password: password
        })
    }
}