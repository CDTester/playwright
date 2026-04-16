# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e4]:
    - text:  You must login to view the secure area!
    - link "×" [ref=e5]:
      - /url: "#"
  - generic [ref=e6]:
    - link "Fork me on GitHub":
      - /url: https://github.com/tourdedave/the-internet
      - img "Fork me on GitHub" [ref=e7]
    - generic [ref=e9]:
      - heading "Login Page" [level=2] [ref=e10]
      - heading "This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages." [level=4] [ref=e11]:
        - text: This is where you can log into the secure area. Enter
        - emphasis [ref=e12]: tomsmith
        - text: for the username and
        - emphasis [ref=e13]: SuperSecretPassword!
        - text: for the password. If the information is wrong you should see error messages.
      - generic [ref=e14]:
        - generic [ref=e16]:
          - generic [ref=e17] [cursor=pointer]: Username
          - textbox "Username" [ref=e18]
        - generic [ref=e20]:
          - generic [ref=e21] [cursor=pointer]: Password
          - textbox "Password" [ref=e22]
        - button " Login" [ref=e23] [cursor=pointer]:
          - generic [ref=e24]:  Login
  - generic [ref=e26]:
    - separator [ref=e27]
    - generic [ref=e28]:
      - text: Powered by
      - link "Elemental Selenium" [ref=e29]:
        - /url: http://elementalselenium.com/
```