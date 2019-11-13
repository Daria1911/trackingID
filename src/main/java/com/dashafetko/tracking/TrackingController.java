package com.dashafetko.tracking;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class TrackingController {

	@PostMapping("/ups/track")
	public String track(@RequestBody String body) {
		RestTemplate restTemplate = new RestTemplate();

//		String url = "https://wwwcie.ups.com/rest/Track";
		String url = "https://onlinetools.ups.com/rest/Track";

		String response = restTemplate.postForObject(url, body, String.class);

		return response;
	}
}
