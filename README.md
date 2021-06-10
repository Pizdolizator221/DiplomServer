# **APT** server configuration

### use ***'./config/default.json'*** to configurate server:

* PORT - default is 4000, you can change it if you need server to listen on another port
* ConnectionStrings - add here a connection string to your database  
example:  
`ConnectionStrings: {`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `"ConnectionStringName": "[Insert connection string URL here]"`  
`}`
* Secret - secret key required to use json web tokens