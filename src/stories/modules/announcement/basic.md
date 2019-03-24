# Pantry Announcement

### Usage

#### VueJS

```javascript
<dp-pantry-announcement :labelText="labelText"
                        :labelColor="labelColor"
                        :content="content"
                        :isLinked="isLinked"
                        :target="target"
                        :isInverse="isInverse"></dp-pantry-announcement>
```

### Preview
<!-- STORY -->

### Properties

| propName     | propType      | defaultValue  | isRequired | description |
|--------------|---------------|---------------|------------| ------------|
| labelText    | string        | New           | √          | label text value |
| labelColor   | string        | -             | √          | sets label text background color |
| content      | string        | -             | √          | announcement content |
| isLinked     | string        | -             | x          | set announcement clickable |
| target       | boolean       | false         | x          | set click target |
| isInverse    | boolean       | false         | x          | invert announcement background color |
