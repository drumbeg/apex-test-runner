Feature: A basic test of my blog

Scenario: A visitor views this blog post on www.modernapex.co.uk
   Given I go to http://www.modernapex.co.uk
   When I click on link 'Browse Posts'
   Then the text 'Building an AngularJS page in APEX' is visible