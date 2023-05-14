import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from './../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from './../src/auth/dto';
import { EditUserDto } from './../src/user/dto';
import { QueryMerchandiseDto } from './../src/merchandise/dto';

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
          .stores('userId', 'id')
      })
    });
  });

  describe('User', () => {
    describe('GetMe', () => {
      it('should get user data', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withBearerToken('$S{userAt}')
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
          .withBearerToken('$S{userAt}')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      })
    });
  });

  describe('Design', () => {
    const createDto1 = {
      title: 'gryffindor',
      description: 'gryffindor is the best house',
    }
    const createDto2 = {
      title: 'slytherin',
    }
    const createDto3 = {
      title: 'hufflepuff',
    }
    describe('GetEmptyDesigns', () => {
      it('should get empty designs', () => {
        return pactum
          .spec()
          .get('/designs')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectBody([]);
      })
    });
    describe('CreateDesign', () => {
      it('should create design', () => {
        return pactum
          .spec()
          .post('/designs')
          .withBearerToken('$S{userAt}')
          .withBody(createDto1)
          .expectStatus(201)
          .stores('designId1', 'id')
      });
    });
    describe('GetDesignById', () => {
      it('should get design by id', () => {
        return pactum
          .spec()
          .get('/designs/$S{designId1}')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectBodyContains(createDto1.title)
      });
    });
    describe('CreateDesign', () => {
      it('should create another design', () => {
        return pactum
          .spec()
          .post('/designs')
          .withBearerToken('$S{userAt}')
          .withBody(createDto2)
          .expectStatus(201)
          .stores('designId2', 'id')
      });
    });
    describe('GetDesigns', () => {
      it('should get 2 designs', () => {
        return pactum
          .spec()
          .get('/designs')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectJsonLength(2)
      })
    });
    describe('EditDesign', () => {
      it('should edit design', () => {
        return pactum
          .spec()
          .patch('/designs/$S{designId2}')
          .withBearerToken('$S{userAt}')
          .withBody({
            description: 'slytherin is house of snakes'
          })
          .expectStatus(200)
          .expectBodyContains('slytherin is house of snakes')
      });
    });
    describe('DeleteDesign', () => {
      it('should delete design', () => {
        return pactum
          .spec()
          .delete('/designs/$S{designId2}')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
      });
    });
    describe('GetDesigns', () => {
      it('should get one design', () => {
        return pactum
          .spec()
          .get('/designs')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectJsonLength(1)
          .expectBodyContains(createDto1.title)
      })
    });
    describe('CreateDesign', () => {
      it('should create another design', () => {
        return pactum
          .spec()
          .post('/designs')
          .withBearerToken('$S{userAt}')
          .withBody(createDto3)
          .expectStatus(201)
          .stores('designId3', 'id')
      });
    });
  });

  describe('Product', () => {
    const createDto1 = {
      title: 'Tshirt',
      basePrice: 200000,
    }
    const createDto2 = {
      title: 'Mug',
      basePrice: 100000,
    }
    const createDto3 = {
      title: 'Pixel',
      basePrice: 5000,
    }
    describe('GetEmptyProducts', () => {
      it('should get empty products', () => {
        return pactum
          .spec()
          .get('/products')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectBody([]);
      })
    });
    describe('CreateProduct', () => {
      it('should create a product', () => {
        return pactum
          .spec()
          .post('/products')
          .withBearerToken('$S{userAt}')
          .withBody(createDto1)
          .expectStatus(201)
          .stores('productId1', 'id')
      });
    });
    describe('CreateProduct', () => {
      it('should create another product', () => {
        return pactum
          .spec()
          .post('/products')
          .withBearerToken('$S{userAt}')
          .withBody(createDto2)
          .expectStatus(201)
          .stores('productId2', 'id')
      });
    });
    describe('GetAllProducts', () => {
      it('should get 2 products', () => {
        return pactum
          .spec()
          .get('/products')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectJsonLength(2)
      })
    });
    describe('GetProductById', () => {
      it('should get product by id', () => {
        return pactum
          .spec()
          .get('/products/$S{productId1}')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectBodyContains(createDto1.title)
      })
    });
    describe('EditProduct', () => {
      it('should edit product', () => {
        return pactum
          .spec()
          .patch('/products/$S{productId2}')
          .withBearerToken('$S{userAt}')
          .withBody({
            basePrice: 150000,
            description: 'this is a mug',
          })
          .expectStatus(200)
          .expectBodyContains('this is a mug')
          .expectBodyContains('150000')
      })
    });
    describe('DeleteProduct', () => {
      it('should delete product', () => {
        return pactum
          .spec()
          .delete('/products/$S{productId2}')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
      });
    });
    describe('GetAllProducts', () => {
      it('should get one product', () => {
        return pactum
          .spec()
          .get('/products')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectJsonLength(1)
          .expectBodyContains(createDto1.title)
      })
    });
    describe('CreateProduct', () => {
      it('should create another product', () => {
        return pactum
          .spec()
          .post('/products')
          .withBearerToken('$S{userAt}')
          .withBody(createDto3)
          .expectStatus(201)
          .stores('productId3', 'id')
      });
    });
  });

  describe('Merchandise', () => {
    describe('CreateMerchandise', () => {
      it('should create merchandise', () => {
        return pactum
          .spec()
          .post('/merchandises')
          .withBearerToken('$S{userAt}')
          .withBody({
            designId: '$S{designId1}',
            productId: '$S{productId1}',
            profit: 10000,
          })
          .expectStatus(201)
          .stores('merchandiseId1', 'id')
      });
    });
    describe('GetMyMerchandises', () => {
      it('should get 1 merchandise', () => {
        return pactum
          .spec()
          .get('/merchandises/my')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectJsonLength(1)
      });
    });
    describe('GetMerchandiseById', () => {
      it('should get a merchandise by Id', () => {
        return pactum
          .spec()
          .get('/merchandises/my/$S{merchandiseId1}')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
      });
    });
    describe('CreateMerchandiseBulk', () => {
      it('should create merchandise', () => {
        return pactum
          .spec()
          .post('/merchandises/bulk')
          .withBearerToken('$S{userAt}')
          .withBody({
            designId: '$S{designId3}',
            products: [
              {
                productId: '$S{productId1}',
                profit: 50000,
              },
              {
                productId: '$S{productId3}',
                profit: 5000,
              }
            ]
          })
          .expectStatus(201)

      });
    });
    describe('GetMerchandises', () => {
      it('should get all merchandises', () => {
        return pactum
          .spec()
          .get('/merchandises')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectJsonLength(3)
          .inspect()

      });
      it('should get all merchandises of product1', () => {
        return pactum
          .spec()
          .get('/merchandises')
          .withBearerToken('$S{userAt}')
          .withQueryParams({
            productId: '$S{productId1}'
          })
          .expectStatus(200)
          .expectJsonLength(2)
      });
      it('should get all merchandises of design3', () => {
        return pactum
          .spec()
          .get('/merchandises')
          .withBearerToken('$S{userAt}')
          .withQueryParams({ designId: '$S{designId3}' })
          .expectStatus(200)
          .expectJsonLength(2)
      });
      it('should get merchandises page2 perpage2', () => {
        return pactum
          .spec()
          .get('/merchandises')
          .withBearerToken('$S{userAt}')
          .withQueryParams({ limit: 2, page: 2 })
          .expectStatus(200)
          .expectJsonLength(1)

      });
    });

  });


  afterAll(() => {
    app.close();
  })

});
