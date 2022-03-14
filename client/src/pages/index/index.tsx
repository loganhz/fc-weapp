import { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { Block, UserAvatar } from '../../components/shared';
import styles from './index.module.less';
import CachedData from '@/cache/common';
import TaskList from '@/components/tasks/list';

type Props = {};

type State = {
  refreshIndex: number;
};
export default class Index extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      refreshIndex: 0,
    };
  }

  goToCreatePage() {
    if (CachedData.hasUserInfo()) {
      Taro.navigateTo({
        url: '/pages/create-task/index',
      });
    } else {
      Taro.getUserProfile({
        desc: '用于完善资料',
        success: (res) => {
          CachedData.setUserInfo(res.userInfo);
          Taro.navigateTo({
            url: '/pages/create-task/index',
          });
        },
      });
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  onPullDownRefresh() {
    const { refreshIndex } = this.state;
    this.setState({ refreshIndex: refreshIndex + 1 });
  }

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { refreshIndex } = this.state;
    return (
      <View className={styles.index}>
        {CachedData.hasUserInfo() && (
          <>
            <UserAvatar />
            <Block title={`你好，${CachedData.getNickName()}！欢迎使用阿里云函数计算 FC！`} />
          </>
        )}
        <TaskList key={refreshIndex} />
        <Button
          className="btn-max-w mt-100"
          type="primary"
          onClick={() => {
            this.goToCreatePage();
          }}
        >
          新建任务
        </Button>
      </View>
    );
  }
}
