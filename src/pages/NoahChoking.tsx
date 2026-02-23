import '../styles/global.css';
import Carousel from '../components/Carousel';
import ScrollableText from '../components/ScrollableText';

export default function NoahChoking() {
  return (
    <div className="project-section">
      <div className="project-carousel">
        <Carousel folder="noah-choking" />
      </div>
      <div className="project-text">
        <div className="project-description">
          <ScrollableText>
            <h1>Noah, choking</h1>
            <p className="description">
              Noah is choking. Stop staring and help! 
            </p>
          </ScrollableText>
        </div>
        <dl className="project-meta">
          <dt>first exhibited</dt>
          <dd>2025, Vilnius art academy</dd>
          <dt>materials</dt>
          <dd>Spout, iron enriched water, canister, water pump, vinyl pipe.</dd>
          <dt>length</dt>
          <dd>Variable</dd>
        </dl>
      </div>
    </div>
  );
}
