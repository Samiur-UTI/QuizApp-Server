import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getTest(): string {
    return 'Test!';
  }
  // async getApi(): Promise<Object> {
  //   // const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  //   // const data = await response.json();
  //   // return data
  //   const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  //   return JSON.stringify(response);
  // }

}
