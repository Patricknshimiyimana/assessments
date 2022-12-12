FROM tomcat:9-alpine

ADD ./target/UserServlet.war /usr/local/tomcat/webapps/

EXPOSE 8080
CMD ["catalina.sh", "run"]