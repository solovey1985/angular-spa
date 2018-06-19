import { createServerRenderer} from 'aspnet-prerendering'

export default createServerRenderer(params => 
     new Promise(function (resolve, reject){
            const html = `<h1>Hello, World from JS!</h1>
            <p>Current time in node: ${ new Date()} </p>
            <p>data:${params.data.isAdministrator }</p>
            <p>data:${params.data.cookies[2].key}</p>
            <p>URL:${ params.location.path }</p>`;

            resolve({html});
     }));