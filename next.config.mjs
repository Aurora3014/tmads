/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
      },
    
    // async rewrites(){
    //     return[
    //         {
    //             source:'/api',
    //             destination:'https://backend-url.com'
    //         }
    //     ]
    // }
};

export default nextConfig;
