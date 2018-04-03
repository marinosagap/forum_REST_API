# my_restfull_blog
API Routes:
GET Requests:
    1. "/user" 

        a. "/"          returns all the users  in JSON format,
        b. "/home"      returns home page in html format,
        c. "/login"     returns login page for user in html format
        d. "/signup"    returns signup page for user in html format

    2. /admin
        a. "/"          returns home page of admin
        b. "/login"     returns login page for admin in html format
        c. "/signup"    returns signup page for admin in html format
        d. "/getusers"  returns list of registered admin_users in json format 

POST Reguests: 
    1. "/user"    
        a. "/signup"    expects json { name:<> , email: < > , password:<>}        
        b. "/login"     expects json { name:<> , email: < > , password:<>}

    2. "/admin"
        a. "/signup"    expects json { name:<> , email: < > , password:<>} 
        b. "/login"     expects json { name:<> , email: < > , password:<>}

PATCH Requests:
    1. "/user"

    2. "/admin"         expects json {name:<> ,password:<>}