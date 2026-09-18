import '../styles/global.css';
import Carousel from '../components/Carousel';
import ScrollableText from '../components/ScrollableText';

export default function NovelObjects() {
  return (
    <div className="project-section">
      <div className="project-carousel">
        <Carousel folder="novel-objects" />
      </div>
      <div className="project-text">
        <div className="project-description">
          <ScrollableText>
            <h1>Novel Objects</h1>
            <p className="description">
              Novel Objects is a community based around exploring the potential of images that, in the context of mass-commercialization, have experienced a dilution of meaning. One such image is Cupid, whose latest transformation in modernity is Kewpie, a character created by Rose O'Neill. It started as a comic in a women's housekeeping magazine, later becoming a collectible toy recognized worldwide: a sort of proto-Barbie. Today only remnants of it remain in public consciousness. We found copies in an online marketplace, now barely attached to the original brand name and origins.
              <br /><br />
              Novel Objects is currently developing an intervention into this hyper-commercialized form of Kewpie by forming a community around common interactions with, and familiarity with, this object and its history.
              <br /><br />
              Community: novel-objects.postvisible.com
            </p>
          </ScrollableText>
        </div>
        <dl className="project-meta">
          <dt>documentation</dt>
          <dd>Nikodemas Trusovas</dd>
          <dt>materials</dt>
          <dd>Kewpie carousel made from wire and white string</dd>
        </dl>
      </div>
    </div>
  );
}