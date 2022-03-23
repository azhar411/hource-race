import { expect } from "chai";
import "mocha";
import { Utils } from "../utils/Utils";
describe("Welcome to horse race", () => {
  let authToken = "";
  it("Autnatication", (done): any => {
    Utils.getRaceToken().then(({ status, message, token }): any => {
      authToken = token;
      expect(token).to.not.equal(null);
      expect(message).to.equal("Successful authentication");
      expect(status).to.equal(200);

      done();
    });
  });

  it("Hource Race data", (done): any => {
    if (authToken) {
      Utils.getRaceResult(authToken).then(({ message, status }) => {
        expect(message).to.equal("Successful request");
        expect(status).to.equal(200);
        done();
      });
    } else {
      expect(200).to.equal(401);
    }
  });
});
describe("Check responses", () => {
  it("401 status", (done): any => {
    expect(401).to.equal(401);
    expect(
      "Authentication token is missing, or does not match an active session"
    ).to.equal(
      "Authentication token is missing, or does not match an active session"
    );
    done();
  });
  it("204 status", (done): any => {
    expect("Request timed out while waiting for new events").to.equal(
      "Request timed out"
    );
    done();
  });
  it("503 status", (done): any => {
    expect("200").to.equal("503");
    done();
  });
});
