import { Component } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.less';
import TaskCreate from '@/components/tasks/create';
import { Block, UserAvatar } from '@/components/shared';
import CachedData from '@/cache/common';

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className={styles.create}>
        <UserAvatar />
        <Block title={`你好，${CachedData.getNickName()}！欢迎使用阿里云函数计算 FC！`} />
        <TaskCreate />
      </View>
    );
  }
}
