import {Controller} from "../core/decorators/controllers/Controller";
import {Get} from "../core/decorators/methods/Get";

@Controller('api')
class ApiController {

    @Get('hello')
    public Test() {
        return 'hello world';
    }
}