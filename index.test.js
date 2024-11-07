const request = require("supertest");
const app = require("./src/app.js");
const Restaurant = require("./models/Restaurant.js");
const syncSeed = require("./seed.js");
let restQuantity;

beforeAll(async () => {
    await syncSeed();
    const restaurants = await Restaurant.findAll();
    restQuantity = restaurants.length;
});


describe ("GET /restaurants", () => {
    it("returns 200 status code", async () => {
        const response = await request(app).get("/restaurants");
        expect(response.statusCode).toBe(200);
    });

    it("returns an array of restaurants", async () => {
        const response = await request(app).get("/restaurants");
        const responseData = JSON.parse(response.text);
        let areAllRests = responseData.every(function (restaurant) {
            let first = restaurant.name && restaurant.location
            return  first && restaurant.cuisine;
        });
        expect(areAllRests).toBe(true);
    });

    it("returns correct number of restaurants", async () => {
        const response = await request(app).get("/restaurants");
        expect(response.body.length).toEqual(restQuantity);
    });

    it("returns correct restaurant data", async () => {
        const response = await request(app).get("/restaurants");
        expect(response.body).toContainEqual(
            expect.objectContaining({
                id: 1,
                name: 'AppleBees',
                location: 'Texas',
                cuisine: 'FastFood'
            })
        );
    });
});

describe("GET /restaurants/:id", () => {
    it("returns correct data", async () => {
        const response = await request(app).get("/restaurants/1");
        expect(response.body).toEqual(
            expect.objectContaining({
                id: 1,
                name: 'AppleBees',
                location: 'Texas',
                cuisine: 'FastFood'
            })
        );
    });
});

describe("POST /restaurants", () => {
    it("returns a larger restaurant array", async () => {
        const response = await request(app)
        .post("/restaurants")
        .send({ name: "Hoppers", location: "Soho", cuisine: "Srilankan" });
        expect(response.body.length).toEqual(restQuantity + 1);
    });

    it("returns an error array when name field is empty", async () => {
        const response = await request(app)
        .post("/restaurants")
        .send({ location: "Soho", cuisine: "Srilankan" });
        expect(response.body).toHaveProperty("error");
        expect(Array.isArray(response.body.error)).toBe(true);
    })

    it("returns an error array when location field is empty", async () => {
        const response = await request(app)
        .post("/restaurants")
        .send({ name: "Hoppers", cuisine: "Srilankan" });
        expect(response.body).toHaveProperty("error");
        expect(Array.isArray(response.body.error)).toBe(true);
    })

    it("returns an error array when cuisine field is empty", async () => {
        const response = await request(app)
        .post("/restaurants")
        .send({ name: "Hoppers", location: "Soho" });
        expect(response.body).toHaveProperty("error");
        expect(Array.isArray(response.body.error)).toBe(true);
    })
});

describe("PUT /restaurants/:id", () => {
    it("should update first item in database", async () => {
        await request(app)
        .put("/restaurants/1")
        .send({ name: "Hoppers", location: "Soho", cuisine: "Srilankan" });
        const restaurant = await Restaurant.findByPk(1);
        expect(restaurant.name).toEqual("Hoppers");
    });
});

describe("DELETE /restaurants/:id", () => {
    it("should delete entry by id", async () => {
        await request(app).delete("/restaurants/1");
        const restaurants = await Restaurant.findAll();
        expect(restaurants.length).toEqual(restQuantity);
        expect(restaurants[0].id).not.toEqual(1);
    });
});