# Button

### Brief
Customed Button

### Preview
<!-- STORY -->

<br>

### Usage

#### Basic HTML
*You can refer to knobs on right menu to get real-time button structure*

``` HTML
<button class="dp-button">
  <span>{{content}}</span>
  <link class="rippleJS"> // This is a optional option
</button>
```
#### VueJS

```javascript
<dp-button
  :class="[buttonSize, buttonType]"
  :is-block="isBlock"
  :is-disabled="isDisabled"
  :ripple="ripple"
  :is-checked="isChecked"
  :pill="isPill">
  <span>search</span>
</dp-button>
```

### Feature
Wrods in button will be automatically capitalized

### Properties
| propName   | propType | defaultValue | isRequired | description                                                                                |
| ---------- | -------- | ------------ | ---------- | ------------------------------------------------------------------------------------------ |
| isBlock    | boolean  | false        | x          | set button full width                                                                      |
| isDisabled | boolean  | false        | x          | set button disabled                                                                        |
| isChecked  | boolean  | false        | x          | set button checked (It is currently used only in checkbox and radio)                       |
| ripple     | boolean  | true         | x          | if show button ripple animation                                                            |
| href       | string   | _            | x          | if href is null, component's tag is button; if href is a valid value, component's tag is a |
| pill       | boolean  | false        | x          | set border radius to pill                                                                  |

### Events
| eventName | emit with value | value      | description     |
| --------- | --------------- | ---------- | --------------- |
| click     | true            | clickEvent | emit when click |

### Classes

#### Button Type Classes
| className                      | isRequired | description                 |
| ------------------------------ | ---------- | --------------------------- |
| dp-button--primary             | ×          | primary style               |
| dp-button--ghost-primary       | ×          | ghost primary style         |
| dp-button--ghost-primary-light | ×          | ghost primary light style   |
| dp-button--ghost-secondary     | ×          | ghost secondary style       |
| dp-button--home-primary        | ×          | home button primary style   |
| dp-button--home-secondary      | ×          | home button secondary style |
| dp-button--tertiary            | ×          | tertiary button style       |
| dp-button--text                | ×          | text button style           |
| dp-button--radio               | ×          | radio button style          |
| dp-button--checkbox            | ×          | checkbox button style       |

#### Button Size Classes
| className     | isRequired | description                  |
| ------------- | ---------- | ---------------------------- |
| dp-button--xs | ×          | extra small style for button |
| dp-button--sm | ×          | small style for button       |

#### Border Radius Classes
| className    | isRequired | description           |
| ------------ | ---------- | --------------------- |
| dp-border-pill | ×          | Rounded (pill) border |

#### Button Style Classes
| className        | isRequired | description            |
| ---------------- | ---------- | ---------------------- |
| dp-button--block | ×          | block style for button |
| dp-button--block | ×          | block style for button |
| disabled         | ×          | disabled style         |

#### Icon Tag Classes
| className             | isRequired | description                          |
| --------------------- | ---------- | ------------------------------------ |
| dp-button__icon-left  | ×          | set icon position in button to left  |
| dp-button__icon-right | ×          | set icon position in button to right |

#### Custom Visibility Classes
| className                | isRequired | description                                                |
| ------------------------ | ---------- | ---------------------------------------------------------- |
| hidden__desktop          | ×          | be hidden on desktop                                       |
| hidden__tablet           | ×          | be hidden on tablet                                        |
| hidden__mobile           | ×          | icon be hidden on mobile                                   |
| visible__desktop--inline | ×          | Only show on desktop (css compiled into "display:inline;") |
| visible__tablet--inline  | ×          | Only show on tablet                                        |
| visible__mobile--inline  | ×          | Only show on mobile                                        |

#### Theme Type Classes
*Theme type classes is suggested to add on body or container you want to take effect on*

| className     | isRequired | description                             |
| ------------- | ---------- | --------------------------------------- |
| dp-theme-dark | ×          | drak theme                              |
| dp-theme-blue | ×          | blue theme(support home button for now) |

#### National Type Classes
*National type classes is suggested to add on body or container you want to take effect on*

| className   | isRequired | description    |
| ----------- | ---------- | -------------- |
| dp-theme-th | ×          | Thailand style |
| dp-theme-hk | ×          | Hongkong style |
| dp-theme-vn | ×          | Vietnam style  |
