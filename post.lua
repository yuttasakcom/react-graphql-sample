wrk.method = "POST"
wrk.body = "{\"query\": \"query{getAllRecipes{_id name}}\"}"
wrk.headers["Content-Type"] = "application/json"