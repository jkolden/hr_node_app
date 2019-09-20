# How to run this application

- docker run --name typical_node_example -p 3000:3000 -it -e TNS_ADMIN='/usr/src/app/Wallet_DB201909100942' -e NODE_ORACLEDB_PASSWORD='<my_db_pw>' node_example

# Node API against Oracle ATP DB

- Based on https://jsao.io/2018/03/creating-a-rest-api-with-node-js-and-oracle-database/
- DB Connect info from https://blogs.oracle.com/dbcs/building-nodejs-apps-with-oracle-autonomous-database-video-tutorial

## Dependencies

- This requires the wallet file in the root directory of the project.

## Env Variables

- NODE_ORACLEDB_PASSWORD (ATP password)
- TNS_ADMIN (lists the path to the wallet file)

## Helpful Resources

- https://github.com/oracle/node-oracledb/tree/master/examples
