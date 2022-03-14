import { Text, View, Icon } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import C from '@/constant/config';

type Task = {
  _id: string;
  content: string;
};

const TaskList = () => {
  const [fetching, setFetching] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    setFetching(true);

    Taro.login({
      success: (res) => {
        if (res.code) {
          Taro.request({
            url: `${C.ENDPOINT}/api/tasks`,
            header: {
              token: res.code,
              env: Taro.getEnv(),
            },
            success: (res) => {
              const { error, data, ErrorCode } = res.data;
              let errorMessage = error || ErrorCode;
              if (errorMessage) {
                Taro.showToast({
                  title: errorMessage,
                  duration: 2000,
                  icon: 'error',
                  mask: false,
                });
              } else {
                setTasks(data);
              }
            },
            complete: () => {
              setFetching(false);
              Taro.stopPullDownRefresh();
            },
          });
        }
      },
    });
  };

  const onDelete = (id) => {
    setFetching(true);

    Taro.login({
      success: (res) => {
        if (res.code) {
          Taro.request({
            url: `${C.ENDPOINT}/api/tasks/${id}`,
            method: 'DELETE',
            header: {
              token: res.code,
              env: Taro.getEnv(),
            },
            success: (res) => {
              const { error, ErrorCode } = res.data;
              let errorMessage = error || ErrorCode;
              if (errorMessage) {
                Taro.showToast({
                  title: errorMessage,
                  duration: 2000,
                  icon: 'error',
                  mask: false,
                });
                setFetching(false);
              } else {
                fetchTasks();
              }
            },
          });
        }
      },
    });
  };

  return (
    <>
      {fetching ? (
        <View className="mt-50 mb-50 text-bold text-gray">
          <Text>正在向函数计算 FC 服务端请求数据...</Text>
        </View>
      ) : (
        <View className="mt-50 mb-50 text-bold">
          {tasks.map((task) => (
            <View key={task._id} className="mt-50 mb-50">
              <Text className="mr-20">{task.content}</Text>
              <Icon size="20" type="clear" color="red" onClick={() => onDelete(task._id)} />
            </View>
          ))}
        </View>
      )}
    </>
  );
};

export default TaskList;
