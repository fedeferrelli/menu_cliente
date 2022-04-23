# Menu

Esta aplicación creada con React es parte de un set de administración de menues. Particularmente, esta aplicación es el POV del administrador del menu y está optimizada para móviles (se trata de darle apariencia de una mobile-app aunque también puede operarse en dispositivos de mayor width).

Consta de 2 pantallas principales: 1) pantalla de menu y 2) pantalla de categorías.

 
### Pantalla de MENU

Recoje los datos desde Firebase y los despliega en forma de lista mostrando la imagen, nombre, descripción abreviada y precio de cada plato. Desde esta pantalla se puede eliminar o modificar el plato. Además puede indicarse si está en stock (si no lo estuviera entonces el plato no se muestra en la aplicación desde el [lado del consumidor](https://github.com/fedeferrelli/menu))

También puede accederse al formulario para cargar nuevos platos y dirigirse al pantalla de categoías.

### Pantalla de CATEGORIAS

Acá se pueden crear, eliminar y/o modificar las categorías a las que pertenecen cada plato (i.e. "Pastas", "Carnes", etc) además se deben ordenar estas categorías de acurdo a la preferencia para mostar el menú (los platos de que categoría se muestran primeros, cuales segundos, etc)

## Herramientas utilizadas

* [React](https://es.reactjs.org/)
* [Tailwind](https://tailwindcss.com/)
* [Firebase](https://firebase.google.com/?hl=es)
* [react-firebase-file-uploader](https://www.npmjs.com/package/react-firebase-file-uploader)
* [react-router-dom](https://v5.reactrouter.com/web/guides/quick-start)
* [react-icons](https://react-icons.github.io/react-icons/)
* [lodash](https://lodash.com/)
* [react-awesome-reveal](https://react-awesome-reveal.morello.dev/)
* [formik](https://formik.org/)
* [yup](https://www.npmjs.com/package/yup)

## Link

Recordá que está optimizada para versión mobile.
Podés acceder desde [acá](https://menu-cliente-fedeferrelli.vercel.app/)
