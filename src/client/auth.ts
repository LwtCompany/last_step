
class Auth {
    private baseUrl = "http://localhost:3000/";

    async singIn(_login: string, _password: string){
            const request_body = {
                login:_login,
                password:_password,
            }
            const response = await fetch(this.baseUrl+"login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(request_body)
    
            });
            let body = await response.json();
           return body;
    }

    async singUp(login: string, password: string, full_name: string){
        const request_body = {
            login,
            password,
            full_name
        }
        const response = await fetch(this.baseUrl+"register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(request_body)

        });
        let body = await response.json();
       return body;
    }

    getBaseUrl(){
        return this.baseUrl;
    }
}

const auth = new Auth()

async function eventSignIn(login: string, password: string){
    
   const result = await auth.singIn(login, password);

   if(result.data){

        sessionStorage.setItem("user_id", result.data.id); 
        sessionStorage.setItem("name", result.data.full_name);

        window.location.href="dashboard.html";
   }
}

async function eventSignUp(full_name: string, login: string, password: string) {
    const result = await auth.singUp(login, password, full_name);

    if(result.data){
 
         sessionStorage.setItem("user_id", result.data.id); 
         sessionStorage.setItem("name", result.data.full_name);
 
         window.location.href="dashboard.html";
    }
}
