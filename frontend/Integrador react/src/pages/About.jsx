import '../styles/about.css';

function About() {
  return (
    <section className="about-us py-5">
      <div className="container text-center">
        <h2 className="about-title">Sobre Nosotros</h2>
        <p className="about-text">
          En Venta Gamer somos apasionados por los videojuegos y todo lo
          relacionado con el mundo gamer. Nuestra misión es acercarte los
          mejores juegos, consolas y accesorios con ofertas exclusivas y envío
          rápido a todo el país. Creemos en la comunidad gamer y queremos que tu
          experiencia de compra sea tan épica como tus partidas.
        </p>
      </div>

      <section className="about-me py-5">
        <div className="container d-flex flex-column flex-md-row align-items-center gap-5">
          <div className="about-me-photo flex-shrink-0">
            <img
              src="/images/yo.jpg"
              alt="Agustin Mora"
              className="rounded-circle shadow"
              width="250"
            />
          </div>

          <div className="about-me-text">
            <h3 className="me-title">Soy Agustin Mora</h3>
            <p>
              Soy un apasionado de los videojuegos y la tecnología. Me encanta
              compartir mi conocimiento y ayudar a mis colegas con lo que llevo
              aprendiendo en todo este tiempo. Mi objetivo es crear experiencias
              únicas para todos los jugadores que visitan nuestro ecommerce.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default About;
