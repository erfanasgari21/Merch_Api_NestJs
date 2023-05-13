import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from './../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      }));
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl(
      'http://localhost:3333',
    );
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'erfan@gmail.com',
      password: '123456',
    }
    describe('Signup', () => {
      it('should throw error if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400)
      });
      it('should throw error if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400)
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
      });
    });
    describe('Login', () => {
      it('should throw error if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ password: dto.password })
          .expectStatus(400)
      });
      it('should throw error if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ email: dto.email })
          .expectStatus(400)
      });
      it('should login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(201)
          .stores('userAt', 'access_token')
      })
    });
  });

  describe('User', () => {
    describe('GetMe', () => {
      it('should get user data', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
      })
    });

    describe('EditUser', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Vladimir',
          email: 'vlad@codewithvlad.com',
        };
        return pactum
          .spec()
          .patch('/users/edit')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      })
    });
  });

  describe('Design', () => {
    describe('GetEmptyDesigns', () => {
      it('should get empty designs', () => {
        return pactum
          .spec()
          .get('/designs')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectBody([]);
      })
    });
    describe('CreateDesign', () => {
      const dto = {
        title: 'Asb',
      }
      it('should create design', () => {
        return pactum
          .spec()
          .post('/designs')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('designId', 'id')
      });
    });
    describe('GetDesigns', () => {
      it('should get one design', () => {
        return pactum
          .spec()
          .get('/designs')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectJsonLength(1)
      })
    });
    describe('GetDesignById', () => {
      it('should get design by id', () => {
        return pactum
          .spec()
          .get('/designs/$S{designId}')
          .withPathParams({
            designId: '$S{designId}'
          })
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .inspect()
      });
    });
    describe('EditDesign', () => { });
    describe('DeleteDesign', () => { });
  });

  describe('Product', () => {
    describe('GetEmptyProducts', () => {
      it('should get empty products', () => {
        return pactum
          .spec()
          .get('/products')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectBody([]);
      })
    });
    describe('CreateProduct', () => {
      const dto = {
        title: 'Tshirt',
        basePrice: 200000,
      }
      it('should create product', () => {
        return pactum
          .spec()
          .post('/products')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .withBody(dto)
          .expectStatus(201)
      });
    });
    describe('GetProducts', () => {
      it('should get one product', () => {
        return pactum
          .spec()
          .get('/products')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectJsonLength(1)
      })
    });
  })

  afterAll(() => {
    app.close();
  })

});
