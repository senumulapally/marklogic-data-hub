export const flowsModelArray = [
  {
    id: 'flow1',
    name: 'Flow 1',
    description: 'This is Flow 1 description',
    handle: 'flow_1',
    execution: {
      batchSize: 10,
      threadCount: 15,
      jobs: [
        {
          'jobId': 'a7e9cf5f-4786-4739-b6c9-876b88cfc927',
          'flowType': 'input',
          'flowName': 'Load Orders',
          'entityName': 'Order',
          'jobName': null,
          'startTime': '2018-10-30T00:22:09.907Z',
          'endTime': '2018-10-30T00:22:10.538Z',
          'jobOutput': ['Oct 29, 2018 5:22:10 PM com.marklogic.contentpump.LocalJobRunner applyConfigOptions\nINFO: Content type: JSON\nException in thread \'main\' java.lang.NoClassDefFoundError: org/apache/log4j/Level\n\tat org.apache.hadoop.mapred.JobConf.<clinit>(JobConf.java:357)\n\tat com.marklogic.contentpump.LocalJob.<init>(LocalJob.java:37)\n\tat com.marklogic.contentpump.LocalJob.getInstance(LocalJob.java:58)\n\tat com.marklogic.contentpump.Command$1.createJob(Command.java:353)\n\tat com.marklogic.contentpump.ContentPump.runCommand(ContentPump.java:226)\n\tat com.marklogic.contentpump.ContentPump.main(ContentPump.java:74)\nCaused by: java.lang.ClassNotFoundException: org.apache.log4j.Level\n\tat java.net.URLClassLoader.findClass(URLClassLoader.java:381)\n\tat java.lang.ClassLoader.loadClass(ClassLoader.java:424)\n\tat sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:331)\n\tat java.lang.ClassLoader.loadClass(ClassLoader.java:357)\n\t... 6 more'],
          'status': 'FAILED',
          'successfulEvents': 0,
          'failedEvents': 0,
          'successfulBatches': 0,
          'failedBatches': 0,
          'duration': 0,
          'iconClass': 'mdi-import',
          'hasLiveOutput': false
        },
        {
          'jobId': 'c751d0fc-12f5-4848-80ce-b842f06de547',
          'flowType': 'input',
          'flowName': 'Load Orders',
          'entityName': 'Order',
          'jobName': null,
          'startTime': '2018-10-30T00:25:54.940Z',
          'endTime': '2018-10-30T00:25:55.443Z',
          'jobOutput': ['java.lang.IllegalArgumentException: The setting for document_typeis not applicable to DELIMITED_TEXT\n\tat com.marklogic.contentpump.Command$1.applyConfigOptions(Command.java:457)\n\tat com.marklogic.contentpump.Command$1.createJob(Command.java:348)\n\tat com.marklogic.contentpump.ContentPump.runCommand(ContentPump.java:226)\n\tat com.marklogic.contentpump.ContentPump.main(ContentPump.java:74)'],
          'status': 'FAILED',
          'successfulEvents': 0,
          'failedEvents': 0,
          'successfulBatches': 0,
          'failedBatches': 0,
          'duration': 0,
          'iconClass': 'mdi-import',
          'hasLiveOutput': false
        },
        {
          'jobId': '8292ae80-d862-4657-bb66-c4e35fca33ec',
          'flowType': 'input',
          'flowName': 'Load Orders',
          'entityName': 'Order',
          'jobName': null,
          'startTime': '2018-10-30T00:25:16.926Z',
          'endTime': '2018-10-30T00:25:17.601Z',
          'jobOutput': ['Oct 29, 2018 5:25:17 PM com.marklogic.contentpump.LocalJobRunner applyConfigOptions\nINFO: Content type: JSON\nException in thread \'main\' java.lang.NoClassDefFoundError: org/apache/log4j/Level\n\tat org.apache.hadoop.mapred.JobConf.<clinit>(JobConf.java:357)\n\tat com.marklogic.contentpump.LocalJob.<init>(LocalJob.java:37)\n\tat com.marklogic.contentpump.LocalJob.getInstance(LocalJob.java:58)\n\tat com.marklogic.contentpump.Command$1.createJob(Command.java:353)\n\tat com.marklogic.contentpump.ContentPump.runCommand(ContentPump.java:226)\n\tat com.marklogic.contentpump.ContentPump.main(ContentPump.java:74)\nCaused by: java.lang.ClassNotFoundException: org.apache.log4j.Level\n\tat java.net.URLClassLoader.findClass(URLClassLoader.java:381)\n\tat java.lang.ClassLoader.loadClass(ClassLoader.java:424)\n\tat sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:331)\n\tat java.lang.ClassLoader.loadClass(ClassLoader.java:357)\n\t... 6 more'],
          'status': 'FAILED',
          'successfulEvents': 0,
          'failedEvents': 0,
          'successfulBatches': 0,
          'failedBatches': 0,
          'duration': 0,
          'iconClass': 'mdi-import',
          'hasLiveOutput': false
        }
      ],
      traces: [],
      lastJob: {
        'jobId': 'a7e9cf5f-4786-4739-b6c9-876b88cfc927',
        'flowType': 'input',
        'flowName': 'Load Orders',
        'entityName': 'Order',
        'jobName': null,
        'startTime': '2018-10-30T00:22:09.907Z',
        'endTime': '2018-10-30T00:22:10.538Z',
        'jobOutput': ['Oct 29, 2018 5:22:10 PM com.marklogic.contentpump.LocalJobRunner applyConfigOptions\nINFO: Content type: JSON\nException in thread \'main\' java.lang.NoClassDefFoundError: org/apache/log4j/Level\n\tat org.apache.hadoop.mapred.JobConf.<clinit>(JobConf.java:357)\n\tat com.marklogic.contentpump.LocalJob.<init>(LocalJob.java:37)\n\tat com.marklogic.contentpump.LocalJob.getInstance(LocalJob.java:58)\n\tat com.marklogic.contentpump.Command$1.createJob(Command.java:353)\n\tat com.marklogic.contentpump.ContentPump.runCommand(ContentPump.java:226)\n\tat com.marklogic.contentpump.ContentPump.main(ContentPump.java:74)\nCaused by: java.lang.ClassNotFoundException: org.apache.log4j.Level\n\tat java.net.URLClassLoader.findClass(URLClassLoader.java:381)\n\tat java.lang.ClassLoader.loadClass(ClassLoader.java:424)\n\tat sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:331)\n\tat java.lang.ClassLoader.loadClass(ClassLoader.java:357)\n\t... 6 more'],
        'status': 'FAILED',
        'successfulEvents': 0,
        'failedEvents': 0,
        'successfulBatches': 0,
        'failedBatches': 0,
        'duration': 0,
        'iconClass': 'mdi-import',
        'hasLiveOutput': false
      },
      docsCommitted: 100,
      docsFailed: 0
    },
    targetEntity: 'Entity 1'
  },
  {
    id: 'flow2',
    name: 'Flow 2',
    description: 'This is Flow 2 description',
    handle: 'flow_2',
    execution: {
      batchSize: 5,
      threadCount: 5,
      jobs: [
        {
          'jobId': '66e543a6-99a4-498e-ace4-4e20cb944739',
          'flowType': 'input',
          'flowName': 'Load Orders',
          'entityName': 'Order',
          'jobName': null,
          'startTime': '2018-10-30T00:24:01.739Z',
          'endTime': '2018-10-30T00:24:02.392Z',
          'jobOutput': ['java.lang.IllegalArgumentException: Only one of generate_uri and uri_id can be specified\n\tat com.marklogic.contentpump.Command$1.applyUriId(Command.java:421)\n\tat com.marklogic.contentpump.Command$1.applyConfigOptions(Command.java:460)\n\tat com.marklogic.contentpump.Command$1.createJob(Command.java:348)\n\tat com.marklogic.contentpump.ContentPump.runCommand(ContentPump.java:226)\n\tat com.marklogic.contentpump.ContentPump.main(ContentPump.java:74)'],
          'status': 'FAILED',
          'successfulEvents': 0,
          'failedEvents': 0,
          'successfulBatches': 0,
          'failedBatches': 0,
          'duration': 0,
          'iconClass': 'mdi-import',
          'hasLiveOutput': false
        },
        {
          'jobId': 'c751d0fc-12f5-4848-80ce-b842f06de547',
          'flowType': 'input',
          'flowName': 'Load Orders',
          'entityName': 'Order',
          'jobName': null,
          'startTime': '2018-10-30T00:25:54.940Z',
          'endTime': '2018-10-30T00:25:55.443Z',
          'jobOutput': ['java.lang.IllegalArgumentException: The setting for document_typeis not applicable to DELIMITED_TEXT\n\tat com.marklogic.contentpump.Command$1.applyConfigOptions(Command.java:457)\n\tat com.marklogic.contentpump.Command$1.createJob(Command.java:348)\n\tat com.marklogic.contentpump.ContentPump.runCommand(ContentPump.java:226)\n\tat com.marklogic.contentpump.ContentPump.main(ContentPump.java:74)'],
          'status': 'FAILED',
          'successfulEvents': 0,
          'failedEvents': 0,
          'successfulBatches': 0,
          'failedBatches': 0,
          'duration': 0,
          'iconClass': 'mdi-import',
          'hasLiveOutput': false
        }
      ],
      traces: [],
      lastJob: {
        'jobId': '66e543a6-99a4-498e-ace4-4e20cb944739',
        'flowType': 'input',
        'flowName': 'Load Orders',
        'entityName': 'Order',
        'jobName': null,
        'startTime': '2018-10-30T00:24:01.739Z',
        'endTime': '2018-10-30T00:24:02.392Z',
        'jobOutput': ['java.lang.IllegalArgumentException: Only one of generate_uri and uri_id can be specified\n\tat com.marklogic.contentpump.Command$1.applyUriId(Command.java:421)\n\tat com.marklogic.contentpump.Command$1.applyConfigOptions(Command.java:460)\n\tat com.marklogic.contentpump.Command$1.createJob(Command.java:348)\n\tat com.marklogic.contentpump.ContentPump.runCommand(ContentPump.java:226)\n\tat com.marklogic.contentpump.ContentPump.main(ContentPump.java:74)'],
        'status': 'FAILED',
        'successfulEvents': 0,
        'failedEvents': 0,
        'successfulBatches': 0,
        'failedBatches': 0,
        'duration': 0,
        'iconClass': 'mdi-import',
        'hasLiveOutput': false
      },
      docsCommitted: 0,
      docsFailed: 20
    },
    targetEntity: 'Entity 1'
  },
  {
    id: 'flow3',
    name: 'Flow 3',
    description: 'This is Flow 3 description',
    handle: 'flow_3',
    execution: {
      batchSize: 10,
      threadCount: 15,
      jobs: [
        {
          'jobId': '66e543a6-99a4-498e-ace4-4e20cb944739',
          'flowType': 'input',
          'flowName': 'Load Orders',
          'entityName': 'Order',
          'jobName': null,
          'startTime': '2018-10-30T00:24:01.739Z',
          'endTime': '2018-10-30T00:24:02.392Z',
          'jobOutput': ['java.lang.IllegalArgumentException: Only one of generate_uri and uri_id can be specified\n\tat com.marklogic.contentpump.Command$1.applyUriId(Command.java:421)\n\tat com.marklogic.contentpump.Command$1.applyConfigOptions(Command.java:460)\n\tat com.marklogic.contentpump.Command$1.createJob(Command.java:348)\n\tat com.marklogic.contentpump.ContentPump.runCommand(ContentPump.java:226)\n\tat com.marklogic.contentpump.ContentPump.main(ContentPump.java:74)'],
          'status': 'FAILED',
          'successfulEvents': 0,
          'failedEvents': 0,
          'successfulBatches': 0,
          'failedBatches': 0,
          'duration': 0,
          'iconClass': 'mdi-import',
          'hasLiveOutput': false
        },
        {
          'jobId': 'c751d0fc-12f5-4848-80ce-b842f06de547',
          'flowType': 'input',
          'flowName': 'Load Orders',
          'entityName': 'Order',
          'jobName': null,
          'startTime': '2018-10-30T00:25:54.940Z',
          'endTime': '2018-10-30T00:25:55.443Z',
          'jobOutput': ['java.lang.IllegalArgumentException: The setting for document_typeis not applicable to DELIMITED_TEXT\n\tat com.marklogic.contentpump.Command$1.applyConfigOptions(Command.java:457)\n\tat com.marklogic.contentpump.Command$1.createJob(Command.java:348)\n\tat com.marklogic.contentpump.ContentPump.runCommand(ContentPump.java:226)\n\tat com.marklogic.contentpump.ContentPump.main(ContentPump.java:74)'],
          'status': 'FAILED',
          'successfulEvents': 0,
          'failedEvents': 0,
          'successfulBatches': 0,
          'failedBatches': 0,
          'duration': 0,
          'iconClass': 'mdi-import',
          'hasLiveOutput': false
        },
        {
          'jobId': '8292ae80-d862-4657-bb66-c4e35fca33ec',
          'flowType': 'input',
          'flowName': 'Load Orders',
          'entityName': 'Order',
          'jobName': null,
          'startTime': '2018-10-30T00:25:16.926Z',
          'endTime': '2018-10-30T00:25:17.601Z',
          'jobOutput': ['Oct 29, 2018 5:25:17 PM com.marklogic.contentpump.LocalJobRunner applyConfigOptions\nINFO: Content type: JSON\nException in thread \'main\' java.lang.NoClassDefFoundError: org/apache/log4j/Level\n\tat org.apache.hadoop.mapred.JobConf.<clinit>(JobConf.java:357)\n\tat com.marklogic.contentpump.LocalJob.<init>(LocalJob.java:37)\n\tat com.marklogic.contentpump.LocalJob.getInstance(LocalJob.java:58)\n\tat com.marklogic.contentpump.Command$1.createJob(Command.java:353)\n\tat com.marklogic.contentpump.ContentPump.runCommand(ContentPump.java:226)\n\tat com.marklogic.contentpump.ContentPump.main(ContentPump.java:74)\nCaused by: java.lang.ClassNotFoundException: org.apache.log4j.Level\n\tat java.net.URLClassLoader.findClass(URLClassLoader.java:381)\n\tat java.lang.ClassLoader.loadClass(ClassLoader.java:424)\n\tat sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:331)\n\tat java.lang.ClassLoader.loadClass(ClassLoader.java:357)\n\t... 6 more'],
          'status': 'FAILED',
          'successfulEvents': 0,
          'failedEvents': 0,
          'successfulBatches': 0,
          'failedBatches': 0,
          'duration': 0,
          'iconClass': 'mdi-import',
          'hasLiveOutput': false
        },
        {
          'jobId': 'a7e9cf5f-4786-4739-b6c9-876b88cfc927',
          'flowType': 'input',
          'flowName': 'Load Orders',
          'entityName': 'Order',
          'jobName': null,
          'startTime': '2018-10-30T00:22:09.907Z',
          'endTime': '2018-10-30T00:22:10.538Z',
          'jobOutput': ['Oct 29, 2018 5:22:10 PM com.marklogic.contentpump.LocalJobRunner applyConfigOptions\nINFO: Content type: JSON\nException in thread \'main\' java.lang.NoClassDefFoundError: org/apache/log4j/Level\n\tat org.apache.hadoop.mapred.JobConf.<clinit>(JobConf.java:357)\n\tat com.marklogic.contentpump.LocalJob.<init>(LocalJob.java:37)\n\tat com.marklogic.contentpump.LocalJob.getInstance(LocalJob.java:58)\n\tat com.marklogic.contentpump.Command$1.createJob(Command.java:353)\n\tat com.marklogic.contentpump.ContentPump.runCommand(ContentPump.java:226)\n\tat com.marklogic.contentpump.ContentPump.main(ContentPump.java:74)\nCaused by: java.lang.ClassNotFoundException: org.apache.log4j.Level\n\tat java.net.URLClassLoader.findClass(URLClassLoader.java:381)\n\tat java.lang.ClassLoader.loadClass(ClassLoader.java:424)\n\tat sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:331)\n\tat java.lang.ClassLoader.loadClass(ClassLoader.java:357)\n\t... 6 more'],
          'status': 'FAILED',
          'successfulEvents': 0,
          'failedEvents': 0,
          'successfulBatches': 0,
          'failedBatches': 0,
          'duration': 0,
          'iconClass': 'mdi-import',
          'hasLiveOutput': false
        }
      ],
      traces: [],
      lastJob: {
        'jobId': '66e543a6-99a4-498e-ace4-4e20cb944739',
        'flowType': 'input',
        'flowName': 'Load Orders',
        'entityName': 'Order',
        'jobName': null,
        'startTime': '2018-10-30T00:24:01.739Z',
        'endTime': '2018-10-30T00:24:02.392Z',
        'jobOutput': ['java.lang.IllegalArgumentException: Only one of generate_uri and uri_id can be specified\n\tat com.marklogic.contentpump.Command$1.applyUriId(Command.java:421)\n\tat com.marklogic.contentpump.Command$1.applyConfigOptions(Command.java:460)\n\tat com.marklogic.contentpump.Command$1.createJob(Command.java:348)\n\tat com.marklogic.contentpump.ContentPump.runCommand(ContentPump.java:226)\n\tat com.marklogic.contentpump.ContentPump.main(ContentPump.java:74)'],
        'status': 'FAILED',
        'successfulEvents': 0,
        'failedEvents': 0,
        'successfulBatches': 0,
        'failedBatches': 0,
        'duration': 0,
        'iconClass': 'mdi-import',
        'hasLiveOutput': false
      },
      docsCommitted: 20,
      docsFailed: 0
    },
    targetEntity: 'Entity 1'
  }
];
