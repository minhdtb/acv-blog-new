import {Controller} from "../core/decorators/controllers/Controller";
import {Get} from "../core/decorators/methods/Get";

@Controller('api')
class ApiController {

    @Get('posts')
    public Test() {
        return [
            {
                title: 'test1',
            },
            {
                title: 'test2'
            }
        ];
    }
}