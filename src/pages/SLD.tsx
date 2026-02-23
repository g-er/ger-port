import '../styles/global.css';
import Carousel from '../components/Carousel';
import ScrollableText from '../components/ScrollableText';

export default function SLD() {
  return (
    <div className="project-section">
      <div className="project-carousel">
        <Carousel folder="sld" />
      </div>
      <div className="project-text">
        <div className="project-description">
          <ScrollableText>
            <h1>SOCIAL LISTENING DEVICE</h1>
            <p className="description">
              offers a glimpse into a near future where your subjectivity gets a usable and interactable extension. Rewind your reality. Gain insight and advice from an AI specialist that grows and accompanies you for every step of your journey. A friend that knows you better than you know yourself. Never leave anything up to faulty human memory. Know when you were wronged, learn from complex situations and achieve self-progress at superhuman efficiency.
            </p>
          </ScrollableText>
        </div>
        <dl className="project-meta">
          <dt>first exhibited</dt>
          <dd>2025, Vilnius art academy</dd>
          <dt>materials</dt>
          <dd>handmade portable recording device, llm, video</dd>
          <dt>length</dt>
          <dd>1 hour video loop</dd>
        </dl>
      </div>
    </div>
  );
}
