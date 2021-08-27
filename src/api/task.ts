import { CreateTaskDto } from "./dto/createTskDto";
import { LoginDto } from "./dto/login.dto";
import { SignUpDto } from "./dto/register.dto";
import { TodoDto } from "./dto/task.dto";

class TaskApi{
    public static async getAll():Promise<TodoDto[]>{
        const resp = await fetch('http://localhost:8000/todo/', {
            method: 'GET',
        });
        const data = await resp.json();
        return data;

    }
    public static async creatTask(createTaskDto: CreateTaskDto):Promise<any>{
      const {title, description} = createTaskDto;
      const resp = await fetch('http://localhost:8000/todo', {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({title, description})
      });
      const data = await resp.json;
      return data;
    }
    
    public static async loginUser(loginDto: LoginDto):Promise<any> {
        const {username, password}= loginDto;
        const resp = await fetch('http://localhost:8000/user/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({password, username})
        });
        const data = await resp.json();
        return data;
    }
    public static async regiter (signUpDto: SignUpDto): Promise<void> {
        const {username, name, email, password} = signUpDto;      
        const resp = await fetch('http://localhost:8000/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, username, email, password})
        });
        const data = await resp.json();
        return data;
    }
}
export default TaskApi;