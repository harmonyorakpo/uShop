import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { globalHeaderInterceptor } from './global-header-interceptor';

describe('globalHeaderInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([globalHeaderInterceptor])),
        provideHttpClientTesting()
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add x-api-key header to requests', () => {
    const testUrl = 'https://api.example.com/test';
    const expectedApiKey = 'xgrOJ38jjT3y5EtDC4hee68QI6qMxKkuaeAOvn0S';

    // Make an HTTP request
    httpClient.get(testUrl).subscribe();

    // Expect that a request was made
    const req = httpTestingController.expectOne(testUrl);

    // Verify that the x-api-key header was added
    expect(req.request.headers.get('x-api-key')).toBe(expectedApiKey);

    // Respond to the request
    req.flush({});
  });

  it('should not interfere with existing headers', () => {
    const testUrl = 'https://api.example.com/test';
    const customHeaders = { 'Content-Type': 'application/json' };

    // Make an HTTP request with existing headers
    httpClient.get(testUrl, { headers: customHeaders }).subscribe();

    // Expect that a request was made
    const req = httpTestingController.expectOne(testUrl);

    // Verify that both headers are present
    expect(req.request.headers.get('x-api-key')).toBe('xgrOJ38jjT3y5EtDC4hee68QI6qMxKkuaeAOvn0S');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    // Respond to the request
    req.flush({});
  });

  it('should work with POST requests', () => {
    const testUrl = 'https://api.example.com/test';
    const testData = { name: 'test' };

    // Make a POST request
    httpClient.post(testUrl, testData).subscribe();

    // Expect that a request was made
    const req = httpTestingController.expectOne(testUrl);

    // Verify the method and header
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('x-api-key')).toBe('xgrOJ38jjT3y5EtDC4hee68QI6qMxKkuaeAOvn0S');
    expect(req.request.body).toEqual(testData);

    // Respond to the request
    req.flush({});
  });
});