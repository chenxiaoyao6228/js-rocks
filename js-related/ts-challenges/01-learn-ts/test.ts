interface User {
  name: string;
  id: string;
  phone: number;
}
let user = <User>{};

user.name = "York"; // Property 'name' does not exist on type '{}'
