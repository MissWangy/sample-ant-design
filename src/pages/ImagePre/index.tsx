import React, { useState, useEffect, useMemo } from 'react';
import 'swiper/css/swiper.css';
import { Card } from 'antd';
import Swiper from 'react-id-swiper';
import styles from './index.less';
import { CloseCircleFilled } from '@ant-design/icons';

const imageData = [
  {
    id: '1',
    url: 'http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg',
    name: '西湖',
  },
  {
    id: '2',
    url: 'http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg',
    name: '草莓',
  },
  {
    id: '3',
    url: 'http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg',
    name: '瀑布',
  },
  {
    id: '4',
    url: 'http://a0.att.hudong.com/64/76/20300001349415131407760417677.jpg',
    name: '宫殿',
  },
  {
    id: '5',
    url: 'http://img2.imgtn.bdimg.com/it/u=3984473917,238095211&fm=26&gp=0.jpg',
    name: '鸟',
  },
  {
    id: '6',
    url: 'http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg',
    name: '西湖',
  },
  {
    id: '7',
    url: 'http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg',
    name: '草莓',
  },
  {
    id: '8',
    url: 'http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg',
    name: '瀑布',
  },
  {
    id: '9',
    url: 'http://a0.att.hudong.com/64/76/20300001349415131407760417677.jpg',
    name: '宫殿',
  },
  {
    id: '10',
    url: 'http://img2.imgtn.bdimg.com/it/u=3984473917,238095211&fm=26&gp=0.jpg',
    name: '鸟',
  },
];

const TreeList: React.FC<any> = () => {
  const [preViewImages, setPreViewImages] = useState<any>([]);

  const [swiperView, setSwiperView] = useState<any>(null);
  const [thumbsSwiper, setTthumbsSwiper] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const handlePreview = (value: any) => {
    setPreViewImages(imageData);
    imageData &&
      imageData.map((item: any, index: number) => {
        if (item.id === value.id) {
          setCurrent(index);
          setVisible(true);
        }
      });
  };

  const params = useMemo(() => {
    return {
      spaceBetween: 20,
      slidesPerView: 4,
    };
  }, [swiperView]);

  swiperView &&
    swiperView.on('slideChange', () => {
      console.log('swiperView', swiperView.activeIndex);
    });

  useEffect(() => {
    if (thumbsSwiper) {
      thumbsSwiper.slideTo(current, 0);
    }
  }, [thumbsSwiper]);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Card title="图片">
      <div className={styles.imageContent}>
        <Swiper {...params} getSwiper={setSwiperView}>
          {imageData &&
            imageData.map((item: any) => {
              return (
                <div
                  key={item.id}
                  onClick={() => handlePreview(item)}
                  className={styles.imageItem}
                  style={{ backgroundImage: `url(${item.url})` }}
                ></div>
              );
            })}
        </Swiper>
        <div style={{ height: 60 }}></div>

        {visible && (
          <div className={styles.prebg}>
            <CloseCircleFilled className={styles.close} onClick={handleClose} />
            <div className={styles.preContent}>
              <Swiper getSwiper={setTthumbsSwiper}>
                {imageData &&
                  imageData.map((item: any) => {
                    return (
                      <div
                        key={item.id}
                        onClick={() => handlePreview(item)}
                        className={styles.thumbImage}
                        style={{ backgroundImage: `url(${item.url})` }}
                      ></div>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        )}

        {/*  */}
      </div>
    </Card>
  );
};

// export default connect({},{})(TreeList)

export default TreeList;
