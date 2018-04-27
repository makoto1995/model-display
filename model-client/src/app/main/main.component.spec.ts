'use strict';
import {expect} from 'chai';
import {SocketService} from '../../components/socket/socket.service';
import {SocketServiceStub} from '../../components/socket/socket.mock';

// describe('Component: MainComponent', function() {
//     let comp: MainComponent;
//     let fixture: ComponentFixture<MainComponent>;
//
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 FormsModule,
//                 HttpModule,
//             ],
//             declarations: [ MainComponent ], // declare the test component
//             providers: [
//                 BaseRequestOptions,
//                 MockBackend,
//                 {
//                     provide: Http,
//                     useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
//                         return new Http(backend, defaultOptions);
//                     },
//                     deps: [MockBackend, BaseRequestOptions]
//                 },
//                 { provide: SocketService, useClass: SocketServiceStub },
//             ],
//         }).compileComponents();
//     }));
//
//     beforeEach(async(inject([MockBackend], (mockBackend) => {
//         mockBackend.connections.subscribe(conn => {
//             conn.mockRespond(new Response(new ResponseOptions({
//                 body: JSON.stringify(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express'])
//             })));
//         });
//     })));
//
//     beforeEach(async(() => {
//         fixture = TestBed.createComponent(MainComponent);
//         // MainComponent test instance
//         comp = fixture.componentInstance;
//
//         /**
//          * Trigger initial data binding.
//          */
//         fixture.detectChanges();
//     }));
//
//     it('should attach a list of things to the controller', () => {
//         expect(comp.awesomeThings.length).to.equal(4);
//     });
// });
