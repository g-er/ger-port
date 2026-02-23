import '../styles/global.css';
import Carousel from '../components/Carousel';
import ScrollableText from '../components/ScrollableText';

export default function Mee() {
  return (
    <div className="project-section">
      <div className="project-carousel">
        <Carousel folder="mee" />
      </div>
      <div className="project-text">
        <div className="project-description">
          <ScrollableText>
            <h1>MEE!</h1>
            <p className="description">
              There have been several mass extinction events throughout the history of earth. Most often they are somehow tied to eutrophication (loss of biodiversity in aquatic ecosystems due to algae overgrowth). 

It begins with a global catastrophe of some sort (volcanic eruption, meteorite, etc.). Then an increase in greenhouse gasses. This raises global temperature and in turn, the water levels rise. Due to the flooding of land, bodies of water are saturated with nutrients, primarily phosphorus and nitrogen. Soon algae overtakes all aquatic ecosystems leading to a mass cleansing of biodiversity. The world is brought to a halt. 

Eventually the algae consume the excess greenhouse gasses. Global temperature decreases and biodiversity recovers in one way or another. This process takes millions of years.
<br></br><br></br>This project is a part of the group exhibition "Ecologies of waste" at Retrito Smarsas.
            </p>
          </ScrollableText>
        </div>
        <dl className="project-meta">
          <dt>first exhibited</dt>
          <dd>2025, Retrito Smarsas, Vilnius</dd>
          <dt>materials</dt>
          <dd>plastic sheet, algae grown from a sample gathered at Kedainiai phosphogypsum waste site, water, steel cable</dd>
          <dt>length</dt>
          <dd>Variable length</dd>
        </dl>
      </div>
    </div>
  );
}
