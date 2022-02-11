console.log(process.env)
console.log(process.env.NODE_ENV)

const env = process.env.NODE_ENV !== "production" ? "development" : "production";

console.log("env is", env)