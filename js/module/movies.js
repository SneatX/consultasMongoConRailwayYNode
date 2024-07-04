import { connect } from "./../../helpers/db/connect.js";
export class movies extends connect {
    static instance; 
    constructor() {
        if(typeof movies.instance === "object") {
            return movies.instance;
        }
        super();
        this.collection = this.db.collection("movis");
        movies.instance = this;
        return this;
    }

    async getAllMovies(){
        let res = await this.collection.find({}).toArray();
        await this.conexion.close()
        return res;
    }

    async getAllActionMovies(){
        let res = await this.collection.find({"genre":{$elemMatch:{$eq:"Accion"}}},{projection: {_id:0, name:1, genre:1}}).toArray();
        await this.conexion.close()
        return res;
    }

    async getAllMoviesWithMoreOf200Bluray(){
        let res = await this.collection.find({format:{$elemMatch:{name:"Bluray", copies: {$gte:200}}}},{projection : {name :1, format: 1}}).toArray();
        await this.conexion.close()
        return res;
    }

    async getAllMoviesWithMinusOf10Dvd(){
        let res = await this.collection.find({format:{$elemMatch:{name:"dvd", copies: {$lt:10}}}},{projection : {_id:0, name:1, format:1}}).toArray();
        await this.conexion.close()
        return res;
    }

    async getAllMoviesWithCobb(){
        let res = await this.collection.find({character: {$elemMatch:{apodo: "Cobb"}}},{_id:0, name:1, character:1}).toArray();
        await this.conexion.close()
        return res;
    }
}