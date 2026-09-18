import '../styles/global.css';
import Carousel from '../components/Carousel';
import ScrollableText from '../components/ScrollableText';

export default function NovelObjectsBirthDefects() {
  return (
    <div className="project-section">
      <div className="project-carousel">
        <Carousel folder="novel-objects/birth defects or reproductive harm" />
      </div>
      <div className="project-text">
        <div className="project-description">
          <ScrollableText>
            <h1>Birth Defects or Reproductive Harm</h1>
            <p className="description">
              An introduction into the Novel Objects community, which focuses on the social meaning behind influential ideas in culture. Currently we are gathering around Cupid, the god of love. We have tracked its metamorphosis and shifts in meaning during the history of Western culture.
              <br /><br />
              During the workshop, participants paint features on little baby Cupid figurines. Participants keep the figurine as an artifact signifying their involvement in this community.
            </p>
          </ScrollableText>
        </div>
        <dl className="project-meta">
          <dt>documentation</dt>
          <dd>Nikodemas Trusovas</dd>
          <dt>event</dt>
          <dd>3022 Art Collective Pavilion, Yaga Festival 2026</dd>
          <dt>materials</dt>
          <dd>Urethane Kewpie replicas, acrylic paint</dd>
        </dl>
      </div>
    </div>
  );
}