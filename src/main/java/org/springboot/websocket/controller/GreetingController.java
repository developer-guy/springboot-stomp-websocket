package org.springboot.websocket.controller;

import org.springboot.websocket.domain.Greeting;
import org.springboot.websocket.domain.HelloMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GreetingController {

    @MessageMapping(value = "/hello")
    @SendTo(value = "/topic/greetings")
    public Greeting greeting(HelloMessage message) throws InterruptedException {
        Thread.sleep(1000);
        return new Greeting("Hello, " + message.getName() + "!");
    }
}
