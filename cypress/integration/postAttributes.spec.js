///<reference types = "cypress"/>

import attributesFactory from "../factories/attributes.factory";
import authFactory from "../factories/auth.factory";

let auth = authFactory.auth();
var sensediaAuth = auth.token;

describe("PostAttributes", function () {
    let attr = attributesFactory.attributes();
    attr.name = "Teste-" + Math.floor(Math.random() * 1000);

    it("Create attribute", function () {
        cy.request({
            method: "POST",
            url: "/api-governance/api/v3/attributes/",
            headers: {
                "Sensedia-Auth": sensediaAuth,
            },
            body: {
                name: attr.name,
                tags: attr.tags,
            },
        }).as("response");
        cy.get("@response").then((res) => {
            expect(res.status).to.be.equal(201);
        });
    });
    it("Create attribute with invalid token", function () {
        attr.token = "f4c5b128-d37d-4076-a846-67f3977df0a5";

        cy.request({
            method: "POST",
            url: "/api-governance/api/v3/attributes/",
            headers: {
                "Sensedia-Auth": attr.token,
            },
            body: {
                name: attr.name,
            },
            failOnStatusCode: false
        }).as("response");
        cy.get("@response").then((res) => {
            expect(res.status).to.be.equal(401);
        });
    });

    it("Create attribute no name", function () {

        cy.request({
            method: "POST",
            url: "/api-governance/api/v3/attributes/",
            headers: {
                "Sensedia-Auth": attr.token,
            },
            body: {
                
            },
            failOnStatusCode: false
        }).as("response");
        cy.get("@response").then((res) => {
            expect(res.status).to.be.equal(401);
        });
    });
});
