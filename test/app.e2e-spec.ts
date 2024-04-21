import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "./../src/app.module";
import { END_POINTS } from "@util/constants";
const { AUTH, COURSE } = END_POINTS;
describe("AppController (e2e)", () => {
  let app: INestApplication;
  let token: string;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it(`${AUTH.BASE}${AUTH.LOGIN} (POST)`, async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email: "Darrel5@hotmail.com", password: "12345678@Xx" })
      .expect(201);
    expect(response.body).toHaveProperty("access_token");
    token = response.body.access_token;
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3);
  });
  it(`${COURSE.BASE}${COURSE.GET_ALL} (GET)`, async () => {
    const response = await request(app.getHttpServer())
      .get(COURSE.BASE + COURSE.GET_ALL)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
